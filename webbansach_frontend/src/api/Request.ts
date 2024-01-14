export async function my_request(uRL:string) {
    //Access the url
    const response = await fetch(uRL);

    //if it can not return the url => error
    if(!response.ok){
        throw new Error(`Can not access the link ${uRL}`);
    }
    //if it's ok
    return response.json();
}