const {Storage} = require("@google-cloud/storage");

// Membuat Client
const storage = new Storage();

// Membuat nama bucket (jangan lupa harus unik)
const bucketName = 'cloud-storage-mlgc' 
const filePath = './image/dicoding-header-logo.png'

// Fungsi untuk membuat bucket jika tidak ditemukan.
async function getOrCreateBucket(bucketName) {
    const bucket = storage.bucket(bucketName);
    try {
        // Mendapatkan informasi bucket jika ada.
        const [metadata] = await bucket.getMetadata();
        console.log(`Bucket ${metadata.name} sudah tersedia!`);
        return bucket;
    } catch(error) {
        const optionsCreateBucket = {
            location: 'ASIA-SOUTHEAST2'
        }
        // Create Bucket
        await storage.createBucket(bucketName, optionsCreateBucket);
        console.log(`${bucketName} bucket created successfully`);
        return bucket;
    }
}

// Fungsi upload single object
async function upload(bucket) {
    try {
        const customMetadata = {
            contentType: 'image/jpeg',
            metadata: {
                type: "header-logo"
            }
        };
    
        const optionsUploadObject = {
            destination: 'dicoding-header-logo.png',
            metadata: customMetadata
        };
    
        await storage.bucket(bucketName).upload(filePath, optionsUploadObject);
        console.log(`${filePath} uploaded to ${bucketName} bucket`);
    } catch(uploadError) {
        console.error(`Gagal mengupload ${filePath}:`, uploadError.message);
    }
}

// Catch Error
getOrCreateBucket(bucketName).then((bucket) => upload(bucket)).catch(console.error)