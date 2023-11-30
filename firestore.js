const {Firestore} = require("@google-cloud/firestore");

const db = new Firestore();

async function store_data() {
    // Membuat Collection root-level
    const doctorsCollections = db.collection('dokter');
    console.log("Collections 'dokter' berhasil dibuat.");

    // Membuat dokumen: Dokter Eros
    const erosDoc = await doctorsCollections.doc("Dokter Erros");
    console.log("Dokumen atas nama dokter Eros berhasil dibuat.");

    // Menambahkan data pribadi dokter Eros
    const profileEros = {
        name: "Dr. Eros",
        keahlian: "Dokter Kulit",
        Almamater: "Universitas A"
    }
    await erosDoc.set(profileEros)
    console.log("Data berhasil ditambahkan ke dokumen Eros");

    // Membuat subcollection: Konsultasi
    const erosSubcollections = erosDoc.collection("Konsultasi");
    console.log("Subcollection Konsultasi berhasil dibuat.");

    // Memnambahkan data ke 
    const historyConsultations = {
        name: {
            depan: "Herman",
            belakang: "Jenaka",
        },
        waktu_konsultasi: Date.now().toString()
    }
    await erosSubcollections.doc("antony").set(historyConsultations);
    console.log("Data berhasil ditambahkan.");
}

store_data().catch(console.error)