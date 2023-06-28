export class Project {
    id: number | undefined;
    name: string = "";
    description: string = "";
    imageUrl: string = "";
    contractTypeId: number | undefined;
    contractSignedOn: string = new Date().toString();
    budget: number = 0;
    isActive: boolean = false;

    // get isNew(): boolean {
    //     return this.id == undefined
    // }

    constructor(data?: Project) {
        if(!data) return;
        if(data.id) this.id = data.id;
        if(data.name) this.name = data.name;
        if(data.description) this.description = data.description;
        if(data.imageUrl) this.imageUrl = data.imageUrl;
        if(data.contractTypeId) this.contractTypeId = data.contractTypeId;
        if(data.contractSignedOn) this.contractSignedOn = data.contractSignedOn;
        if(data.budget) this.budget = data.budget;
        if(data.isActive) this.isActive = data.isActive;
    }
}