const truncate = (value?: string, size?: number) =>
  size && value && value?.length > size ? `${value?.slice(0, size)}...` : value;

export default truncate;
