interface Developer<T> {
    name: string,
    salary: number,
    device: {
        brand: string,
        model: string,
        releasedYear: string,
    },
    smartWatch: T
}

interface poorDevWatch {
    heartRate: string,
    stopWatch: boolean
}

interface AppleWatch {
    heartRate: string,
    aiFeature: boolean,
    callSupport: boolean
}

const poorDeveloper: Developer<poorDevWatch> = {
    name: "mr.poor",
    salary: 20,
    device: {
        brand: "lenovo",
        model: "A21",
        releasedYear: "2000",
    },
    smartWatch: {
        heartRate: "100",
        stopWatch: true
    }
}

const richDeveloper: Developer<AppleWatch> = {
    name: "mr.rich",
    salary: 50,
    device: {
        brand: "apple",
        model: "A25",
        releasedYear: "2026",
    },
    smartWatch: {
        heartRate: "100",
        aiFeature: true,
        callSupport: true
    }
}