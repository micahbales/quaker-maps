import { db } from '../utils/admin'

export const getMeetings = async (req: any, res: any) => {
    try {
        // Get meetings collection
        const data = await db.collection('meetings').get()

        // Collect all documents from collection
        const meetings: any[] = []
        data.forEach((doc) => {
            meetings.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return res.json({ meetings })
    } catch (error) {
        return res.json({ error })
    }
}

export const getMeeting = async (req: any, res: any) => {
    // Get document from meeting collection with a documentId of req.params.docId
    const doc = await db.collection('meetings')
        // .doc takes an argument of the record's documentId
        .doc(req.params.docId)
        .get()

    return res.json({
        id: req.params.docId,
        ...doc.data(),
    })
}
