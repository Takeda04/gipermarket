
const formatter = (price?: number | null) => new Intl.NumberFormat('ru', {
  style: 'decimal',
}).format(price || 0);

export default formatter