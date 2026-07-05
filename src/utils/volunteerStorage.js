const STORAGE_KEY = "firevolunteer.volunteers";

const defaultVolunteers = [
    { id: "RVN-00124", name: "Ahmad Subardjo", phone: "0812-3456-7890", skill: "Pemadam Kebakaran", status: "AKTIF" },
    { id: "RVN-00125", name: "Lina Safitri", phone: "0812-9876-5432", skill: "Medis / First Aid", status: "AKTIF" },
    { id: "RVN-00128", name: "Bambang Utomo", phone: "0813-1122-3344", skill: "Logistik", status: "NONAKTIF" },
    { id: "RVN-00130", name: "Dedi Kusuma", phone: "0812-4455-6677", skill: "Evakuasi", status: "AKTIF" },
];

function getStoredVolunteers() {
    if (typeof window === "undefined") {
        return defaultVolunteers;
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return defaultVolunteers;
        }

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultVolunteers;
    } catch (error) {
        console.error("Gagal membaca data relawan:", error);
        return defaultVolunteers;
    }
}

function saveVolunteers(volunteers) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(volunteers));
    window.dispatchEvent(new Event("volunteers:updated"));
}

function addVolunteer(volunteer) {
    const current = getStoredVolunteers();
    const next = [volunteer, ...current];
    saveVolunteers(next);
    return next;
}

export { STORAGE_KEY, defaultVolunteers, getStoredVolunteers, saveVolunteers, addVolunteer };
