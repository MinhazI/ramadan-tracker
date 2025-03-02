export default interface iPrayer {
    currentIslamicDate: string
    tharaweehCount: number,
    lastUpdated: string
}

export type PrayerHistory = Record<string, iPrayer>