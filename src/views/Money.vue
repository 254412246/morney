<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="abc" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <Notes field-name="备注"
               placeholder="请输入备注"
               @update:value="qqq"/>
        <Tags :data-source.sync="tags" @update:value="yyy"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component, Watch} from 'vue-property-decorator';
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';

    const recordList = recordListModel.fetch();
    const tagList = tagListModel.fetch();

    @Component({
        components: {Tags, Notes, Types, NumberPad}
    })

    export default class Money extends Vue {
        tags = tagList;

        recordList: RecordItem[] = recordList;
        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };


        yyy(value: string[]) {
            this.record.tags = value;
        }

        qqq(value: string) {
            this.record.notes = value;
        }

        abc(value: string) {
            this.record.amount = parseFloat(value);
        }

        saveRecord() {
            const record22: RecordItem = recordListModel.clone(this.record);
            record22.createdAt = new Date();
            this.recordList.push(record22);
        }

        @Watch('recordList')
        onRecordListChange() {
            recordListModel.save(this.recordList);
        }

    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
