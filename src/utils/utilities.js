export const renameField = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}