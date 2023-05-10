

/* Example csv data from Ofcom:
Call Sign,Status,Product,Call Sign MMSI: Last Modified Date
M7RFT,Allocated,Amateur Foundation Radio Licence,05/11/2022
M3YVL,Allocated,Amateur Foundation Radio Licence,23/07/2016
M7CVI,Allocated,Amateur Foundation Radio Licence,28/01/2022
M6DNO,Allocated,Amateur Foundation Radio Licence,10/08/2016
M7VIK,Allocated,Amateur Foundation Radio Licence,27/10/2022
M3CAB,Allocated,Amateur Foundation Radio Licence,29/01/2022
M7EIE,Allocated,Amateur Foundation Radio Licence,26/10/2021
M6GWB,Allocated,Amateur Foundation Radio Licence,16/11/2019
20LQX,Allocated,Amateur Intermediate Radio Licence,20/01/2022
 */
export class CallSignRecord {
    constructor(callSign, status, product, lastModifiedDate) {
        this.callSign = callSign;
        this.status = status;
        this.product = product;
        this.lastModifiedDate = lastModifiedDate;
    }
}