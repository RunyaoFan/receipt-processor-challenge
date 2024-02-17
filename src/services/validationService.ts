export function validateReceipt(body: any): boolean {
    // A simple validator that checks if required fields exist
    // we can expand this to include more rigorous checks
    const requiredProperties = ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'];
    for (const prop of requiredProperties) {
        if (!(prop in body)) {
            return false;
        }
    }
    return true;
}