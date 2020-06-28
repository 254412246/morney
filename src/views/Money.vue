<template>
    <Layout class-prefix="layout">
        <NumberPad @submit="
        saveRecord" @update:value="abc"/>
        <Tabs :data-source="recordTypeList"
              :value.sync="record.type"/>
        <div class="notes">
            <FormItem field-name="备注"
                      placeholder="请输入备注"
                      @update:value="onUpdateNotes"/>
        </div>
        <Tags/>
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
            tags: [], notes: '', type: '-', amount: 0
        };

        created() {
            this.$store.commit('fetchRecords');
        }

        saveRecord() {
            this.$store.commit('createRecord', this.record);
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
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>
