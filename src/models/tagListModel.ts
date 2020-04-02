const localStorageKeyName = 'tagList';
type TagListModel = {
    data: string[];
    fetch: () => string[];
    create: (name: string) => 'success' | 'duplicated';
    save: () => void;

}
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name) {
        if (this.data.indexOf(name) >= 0) {
             return 'duplicated';//失败，name重复
        }
        this.data.push(name);
        this.save();
        return 'success';//成功
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};
export default tagListModel;