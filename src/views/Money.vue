<template>
    <Layout class-prefix="layout">
        <NumberPad @submit="
        saveRecord" @update:value="abc"/>
        <Tabs :data-source="recordTypeList"
              :value.sync="record.type"/>
        <div class="createdAt">
            <FormItem field-name="日期"
                      type="date"
                      placeholder="在这里输入日期"
                      :value.sync="record.createdAt"
            />
        </div>
        <div class="notes">
            <FormItem field-name="备注"
                      placeholder="请输入备注"
                      :value.sync="record.notes"/>
        </div>
        <Tags @update:value="record.tags=$event"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/Formltem.vue';
    import {Component} from 'vue-property-decorator';
    import recordTypeList from '@/constants/recordTypeList';
    import Tags from '@/components/Money/Tags.vue';
    import Tabs from '@/components/Tabs.vue';

    @Component({
        components: {Tabs, Tags, FormItem, NumberPad},
    })

    export default class Money extends Vue {
        get recordList() {
            return this.$store.state.recordList;
        }
        recordTypeList = recordTypeList;
        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0,createdAt: new Date().toISOString()
        };

        created() {
            this.$store.commit('fetchRecords');
        }

        saveRecord() {
            if (!this.record.tags|| this.record.tags.length===0){
                return window.alert('至少选择一个标签');
            }
            this.$store.commit('createRecord', this.record);
            if (this.$store.state.createRecordError===null){
                window.alert('保存成功');
                this.record.notes=''
            }

        }


        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        abc(value: string) {
            this.record.amount = parseFloat(value);
        }


    }
</script>

<style lang="scss" scoped>
    ::v-deep .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>
