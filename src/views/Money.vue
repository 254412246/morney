<template>
    <Layout class-prefix="layout">
        {{recordList}}
        <NumberPad @update:value="abc" @submit="saveRecord"/>
        <Types :value.sync="record.type"/>
        <Notes @update:value="qqq"/>
        <Tags :data-source.sync="tags" @update:value="yyy"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Watch} from 'vue-property-decorator';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    type Record = {
        tags: string[];
        notes: string;
        type: string;
        amount: number;
        createdAt?: Date;
    }
    @Component({
        components: {Tags, Notes, Types, NumberPad}
    })

    export default class Money extends Vue {
        tags = ['衣', '食', '住', '行', '彩票'];

        recordList: Record[] = recordList;
        record: Record = {
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
        saveRecord(){
            const record2: Record = JSON.parse(JSON.stringify(this.record));
            record2.createdAt = new Date();
            this.recordList.push(record2);
        }
        @Watch('recordList')
        onRecordListChange() {
            window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
        }

    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
