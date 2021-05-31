export default function (date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    console.log(3123);
    return new Date(date).toLocaleDateString('ru-RU', options)
}