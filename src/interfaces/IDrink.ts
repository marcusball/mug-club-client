export default interface IDrink {
    id: number;
    drank_on: string;
    name: string;
    brewery: string;
    rating: number;
    comment: string | null;
}