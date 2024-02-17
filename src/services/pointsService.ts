import InMemoryMap from '../models/inMemoryMap';

class PointsService {
    private map: InMemoryMap;

    constructor(map: InMemoryMap) {
        this.map = map;
    }

    calculatePoints(body: any): number {
        let points = 0;

        for (const char of body.retailer) {
            const charCode = char.charCodeAt(0);
            if ((charCode >= 48 && charCode <= 57) ||
                (charCode >= 65 && charCode <= 90) ||
                (charCode >= 97 && charCode <= 122)) {
                points++;
            }
        }

        if (parseFloat(body.total) % 1 === 0) {
            points += 50;
        }

        if (parseFloat(body.total) % 0.25 === 0) {
            points += 25;
        }

        points += Math.floor(body.items.length / 2) * 5;

        body.items.forEach((item: any) => {
            if (item.shortDescription.trim().length % 3 === 0) {
                points += Math.ceil(parseFloat(item.price) * 0.2);
            }
        });

        const purchaseDate = new Date(body.purchaseDate);
        if (purchaseDate.getUTCDate() % 2 !== 0) {
            points += 6;
        }

        const purchaseTime = body.purchaseTime.split(':');
        const purchaseHour = parseInt(purchaseTime[0], 10);
        if (purchaseHour >= 14 && purchaseHour < 16) {
            points += 10;
        }

        return points; 
    }

    storePoints(id: string, points: number): void {
        this.map.setItem(id, points);
    }

    getPoints(id: string): number | undefined {
        return this.map.getItem(id);
    }
}

export default PointsService;