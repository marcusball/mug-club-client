export default class Config {
    // Parcel will insert the API_URL environment variable here during building. 
    static readonly API_URL: string = process.env.API_URL;

    static apiRoute(path: string): string {
        return Config.API_URL + path;
    }
};