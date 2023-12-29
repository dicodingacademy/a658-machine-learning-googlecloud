const {Firestore} = require("@google-cloud/firestore");

const db = new Firestore();

async function store_data() {
    // Membuat Collection root-level
    const doctorsCollections = db.collection('dokter');
    console.log("Collections 'dokter' berhasil dibuat.");

    // Membuat dokumen: Dokter Eros
    const erosDoc = await doctorsCollections.doc("Dokter Eros");
    console.log("Dokumen atas nama dokter Eros berhasil dibuat.");

    // Menambahkan data pribadi dokter Eros
    const profileEros = {
        nama: "Dr.Eros",
        keahlian: "Dokter Kulit",
        almamater: "Universitas A"
    }
    await erosDoc.set(profileEros)
    console.log("Data berhasil ditambahkan ke dokumen Eros");

    // Membuat subcollection: Konsultasi
    const erosSubcollections = erosDoc.collection("Konsultasi");
    console.log("Subcollection Konsultasi berhasil dibuat.");

    // Menambahkan data ke 
    const historyConsultations = {
        nama_pasien: {
            depan: "Antony",
            belakang: "Gunawan",
        },
        waktu_konsultasi: Date.now().toString()
    }
    await erosSubcollections.doc("Antony").set(historyConsultations);
    console.log("Data berhasil ditambahkan.");
}

store_data().catch(console.error)