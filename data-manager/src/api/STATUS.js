const logs = []

const STATUS = (result) => {
    logs.push(result);
    logs.sort();
    console.log(logs)
}

export default STATUS;