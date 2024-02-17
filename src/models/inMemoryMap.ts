class InMemoryMap {
    private map: Map<string, number>;

    constructor() {
        this.map = new Map<string, number>();
    }

    setItem(key: string, value: number): void {
        this.map.set(key, value);
    }

    getItem(key: string): number | undefined {
        return this.map.get(key);
    }
}

export default InMemoryMap;