import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        createRecordError: null,
        createTagError:null,
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        createRecord(state, record: RecordItem) {//创建标签，保存标签
            const record2 = clone(record);
            record2.createdAt = record2.createdAt || new Date().toISOString();//添加时间
            state.recordList.push(record2);
            store.commit('saveRecords');


        },
        saveRecords(state) {//保存数据
            window.localStorage.setItem('recordList',
                JSON.stringify(state.recordList));
        },
        fetchRecords(state) {//初始化，读取数据
            state.recordList =
                JSON.parse(window.localStorage.getItem
                ('recordList') || '[]') as RecordItem[];
        },
        fetchTags(state) {//读取标签，相当于初始化
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if (!state.tagList || state.tagList.length === 0) {
                store.commit('createTag', '衣');
                store.commit('createTag', '食');
                store.commit('createTag', '住');
                store.commit('createTag', '行');
                store.commit('createTag', '玩');
            }
        },
        createTag(state, name: string) {//创建记账页的标签
            state.createTagError=null
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                state.createTagError=new Error('tag name duplicated')
                return
            } else {
                const id = createId().toString();
                state.tagList.push({id, name: name});
                store.commit('saveTags');
                state.createTagError=new Error('Tag creation successful')
            }

        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        updateTag(state, payload: { id: string; name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();//后退一步
            } else {
                window.alert('删除失败');
            }

        },
    }

});
export default store;
