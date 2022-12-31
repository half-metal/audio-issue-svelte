/**
 * @endpoint /fileAudio gets audio from file system
 * 
 */
import { json } from '@sveltejs/kit';
// import { Readable } from 'node:stream';

export const settings = [
    {id: 1, name:"imagePath", value:"/Users/brockboss/apps/audio-svelte/src/lib/assets/"},
    {id: 2, name:"altImagePath", value:"/apps/audio-svelte/src/lib/assets/"},
    {id: 3, name:"audioPath", value:"/apps/new-showglobe/src/lib/assets/"}

]

//import { Readable } from 'node:stream';
//import {WritableStream} from 'node:stream/web';
/** @typedef {import('fs').WriteStream} WriteStream */
import fsp from 'node:fs/promises'
//import fsb from 'fs-backwards-stream'
//const filePath = `${settings[0].value}${fileLocation}`


//'audio/mp4' works for m4a but unable to seek in browser
//'audio/mp3' works for mp3
//application/x-download-file
//'Content-Type': 'application/mpeg', works for mp3
let responseHeaders = {
                    'Content-Range': 'bytes 0-10000000',
                    'Content-Type': 'audio/mpeg',
                    'Accept-Ranges': 'bytes', 
                    'Content-Length': 'chunksize',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type,Last-modified,Connection,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Date',
                    'Access-Control-Expose-Headers': 'Content-Type,Last-modified,Connection,Access-Control-Allow-Origin,Access-Control-Allow-Methods,Date'
                 };


/**
* @param {{ searchParams: { get: (arg0: string) => any; }, url:any}}
*/
export async function GET({url}) {
    console.log("@debug get function called, url is",url);
    const fileFolderPath = url.searchParams.get('fileFolderPath')
    console.log("@debug fileFolderPath is",fileFolderPath);

    const fileName = url.searchParams.get('fileName')
    let filePath = `${settings[0].value}${fileFolderPath}`
    console.log("@debug filePath is",filePath);
    console.log('${filePath}/${fileName} before is:',`${filePath}/${fileName}`)
    //const stats = await fsp.stat(`${filePath}/${fileName}`)
    const file = `${filePath}/${fileName}`
    console.log('file in POST',file);
    const fd = await fsp.open(file)
    /** @class Stream */
    const readStream = fd.createReadStream()
    //const responseFile = fd.readFile(file)
    let debugResponse = new Response(readStream, { headers: responseHeaders });
    console.log('debugResponse',debugResponse);
    return new Response(readStream, { headers: responseHeaders });
    //return json(readStream)

}