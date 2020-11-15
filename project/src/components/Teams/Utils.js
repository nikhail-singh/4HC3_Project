export function shortName(string){
    var split = string.split(' ');
    var result = "";
    for(let part of split){
        result += part.substring(0,1);
    }
    return result;
}