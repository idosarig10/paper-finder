import Dimensions from "../interfaces/Dimensions";

interface FilledRegion {
    count: number;
    rotated: boolean;
}

interface CutResult {
    totalBooks: number;
    regions: FilledRegion[];
}

const EMPTY_RESULT: CutResult = {totalBooks: 0, regions: []};

function cacheKey(w: number, h: number): string {
    return `${Math.round(w * 100)}_${Math.round(h * 100)}`;
}

function createGuillotineSolver(bookW: number, bookH: number) {
    const cache = new Map<string, CutResult>();
    const minDim = Math.min(bookW, bookH);

    function solve(W: number, H: number): CutResult {
        if (W < minDim || H < minDim) return EMPTY_RESULT;

        const key = cacheKey(W, H);
        const cached = cache.get(key);
        if (cached !== undefined) return cached;

        let best: CutResult = EMPTY_RESULT;

        // Try filling with normal-orientation books
        const nxNormal = Math.floor(W / bookW);
        const nyNormal = Math.floor(H / bookH);
        if (nxNormal > 0 && nyNormal > 0) {
            const filled: FilledRegion = {count: nxNormal * nyNormal, rotated: false};

            // Horizontal-first cut remainder
            const right1 = solve(W - nxNormal * bookW, H);
            const bottom1 = solve(nxNormal * bookW, H - nyNormal * bookH);
            const total1 = filled.count + right1.totalBooks + bottom1.totalBooks;
            if (total1 > best.totalBooks) {
                best = {totalBooks: total1, regions: [filled, ...right1.regions, ...bottom1.regions]};
            }

            // Vertical-first cut remainder
            const bottom2 = solve(W, H - nyNormal * bookH);
            const right2 = solve(W - nxNormal * bookW, nyNormal * bookH);
            const total2 = filled.count + bottom2.totalBooks + right2.totalBooks;
            if (total2 > best.totalBooks) {
                best = {totalBooks: total2, regions: [filled, ...bottom2.regions, ...right2.regions]};
            }
        }

        // Try filling with rotated books
        const nxRotated = Math.floor(W / bookH);
        const nyRotated = Math.floor(H / bookW);
        if (nxRotated > 0 && nyRotated > 0) {
            const filled: FilledRegion = {count: nxRotated * nyRotated, rotated: true};

            const right1 = solve(W - nxRotated * bookH, H);
            const bottom1 = solve(nxRotated * bookH, H - nyRotated * bookW);
            const total1 = filled.count + right1.totalBooks + bottom1.totalBooks;
            if (total1 > best.totalBooks) {
                best = {totalBooks: total1, regions: [filled, ...right1.regions, ...bottom1.regions]};
            }

            const bottom2 = solve(W, H - nyRotated * bookW);
            const right2 = solve(W - nxRotated * bookH, nyRotated * bookW);
            const total2 = filled.count + bottom2.totalBooks + right2.totalBooks;
            if (total2 > best.totalBooks) {
                best = {totalBooks: total2, regions: [filled, ...bottom2.regions, ...right2.regions]};
            }
        }

        // Try arbitrary guillotine cuts at book-aligned positions
        const hCutPositions = new Set<number>();
        for (let k = 1; k * bookH < H; k++) hCutPositions.add(k * bookH);
        for (let k = 1; k * bookW < H; k++) hCutPositions.add(k * bookW);

        for (const y of hCutPositions) {
            const top = solve(W, y);
            const bottom = solve(W, H - y);
            const total = top.totalBooks + bottom.totalBooks;
            if (total > best.totalBooks) {
                best = {totalBooks: total, regions: [...top.regions, ...bottom.regions]};
            }
        }

        const vCutPositions = new Set<number>();
        for (let k = 1; k * bookW < W; k++) vCutPositions.add(k * bookW);
        for (let k = 1; k * bookH < W; k++) vCutPositions.add(k * bookH);

        for (const x of vCutPositions) {
            const left = solve(x, H);
            const right = solve(W - x, H);
            const total = left.totalBooks + right.totalBooks;
            if (total > best.totalBooks) {
                best = {totalBooks: total, regions: [...left.regions, ...right.regions]};
            }
        }

        cache.set(key, best);
        return best;
    }

    return solve;
}

function regionsToBlocks(regions: FilledRegion[]): Array<Array<boolean>> {
    const blocks: Array<Array<boolean>> = [];
    for (const region of regions) {
        if (region.count > 0) {
            blocks.push(Array(region.count).fill(region.rotated));
        }
    }
    return blocks.length > 0 ? blocks : [[]];
}

const findArrangement = (paperDimensions: Dimensions, bookDimensions: Dimensions): Array<Array<boolean>> => {
    const solver = createGuillotineSolver(bookDimensions.width, bookDimensions.height);
    const result = solver(paperDimensions.width, paperDimensions.height);
    return regionsToBlocks(result.regions);
};

export default findArrangement;
