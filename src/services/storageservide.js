import {createClient} from "@supabase/supabase-js";
const supabase = createClient({
    supabase:process.env.SUPABASE_URL,
    servicerole:process.env.SUPABASE_SERVICE_ROLE_KEY
});

const BUCKET_NAME = "portfolio";
export const uploadToStorage = async(file,folder="images")=>
{
    if(!file)
    {
        throw new Error("File is required!")
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g,"-")}`;
    const filePath = `${folder}/${fileName}`;
    const{error} = await supabase.storage.from(BUCKET_NAME).upload(filePath,file.buffer,{contentType:file.mimeType,upsert:false});

    if(error)
    {
        throw new Error(error.message)
    }
    const{data}=supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
}