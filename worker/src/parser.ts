export function parse(text:string,values:any,startDelimiter="{",endDelimeter="}"){
    //you received {comment.amount} money from {comment.link}
    let startIndex=0;
    let endIndex=1;

    let finalString="";

    while(endIndex<text.length)
    {
        if(text[startIndex]===startDelimiter){
            let endPoint=startIndex+2;
            while(text[endPoint]!==endDelimeter){
             endPoint++;
            }
            //
            let stringHoldingValue=text.slice(startIndex+1,endPoint);
            const keys=stringHoldingValue.split(".");
            let localValues={
                ...values
            }

            for(let i=0;i<keys.length;i++)
            {
                if(typeof localValues==="string"){
                    localValues=JSON.parse(localValues);
                }                     //@ts-ignore
                localValues=localValues[keys[i]];
            }
            finalString+=localValues;
            startIndex=endPoint+1;
            endIndex=endPoint+2;
        }else{
            finalString+=text[startIndex];
            startIndex++;
            endIndex++;
        }
    }
    if(text[startIndex]){
        finalString+=text[startIndex];
    }
    return finalString;
}


// better parser in js/ts:-
// export function parseRegex(text: string, values: any): string {
//     return text.replace(/\{([^}]+)\}/g, (_, path) => {
//         const keys = path.split('.');
//         let current = typeof values === "string" ? JSON.parse(values) : values;
        
//         for (const key of keys) {
//             if (current && typeof current === "string") current = JSON.parse(current);
//             current = current?.[key];
//         }
//         return current !== undefined ? current : '';
//     });
// }