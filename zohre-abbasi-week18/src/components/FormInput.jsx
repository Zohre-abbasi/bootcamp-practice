function FormInput({ name, placeholder, register, error }) {
  return (
    <>
      <input {...register(name)} placeholder={placeholder} />

      {error && <span>{error.message}</span>}
    </>
  );
}

export default FormInput;
