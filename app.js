// Import Google Cloud Client Libraries
const {Storage} = require("@google-cloud/storage")

// Membuat klien menggunakan default credentials
const storage = new Storage();

/**
 * Anda bisa membuat client menggunakan service account key secara langsung
 * menggunakan kode di bawah ini.
 * 
 * const storage = new Storage({keyFilename: '<path to your key.json>'})
 */

// Mendefinisikan nama dan metadta bucket yang akan dibuat
const bucketName = 'new-buckets-mlgc'
const metadata = {
    location: 'ASIA-SOUTHEAST2',
    storageClass: 'COLDLINE'
}
// Membuat GCS bucket
async function createBucket() {
    await storage.createBucket(bucketName, metadata);
    console.log(`Bucket ${bucketName} berhasil dibuat.`);
}

// Cek jika terjadi error
createBucket().catch(console.error)