import DecodedInformation from './DecodedInformation';
export default class BlockParsedResult {
    private readonly decodedInformation: DecodedInformation;
    private readonly finished: boolean;
    constructor(finished: boolean, decodedInformation?: DecodedInformation) {
        this.finished = finished;
        this.decodedInformation = decodedInformation;
    }
    getDecodedInformation(): DecodedInformation {
        return this.decodedInformation;
    }
    isFinished(): boolean {
        return this.finished;
    }
}
