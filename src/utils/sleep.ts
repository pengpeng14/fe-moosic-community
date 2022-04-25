const sleep = async (millisecs: number) => {
  return new Promise((resolve) => setTimeout(resolve, millisecs));
};

export default sleep;
