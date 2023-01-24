export const validationDates = (start: string, end: string) => {
    return (+start.replaceAll('-', '')) < (+end.replaceAll('-', ''))
}