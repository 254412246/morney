function clone<T>(data: T): T {//克隆  T表示date是什么类型返回值技术什么类型,必须三个都一样
    return JSON.parse(JSON.stringify(data));
}

export default clone;