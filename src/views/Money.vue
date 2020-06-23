<template>
    <Layout class-prefix="layout">
        <NumberPad @submit="
        saveRecord" @update:value="abc"/>
        <Types :value.sync="record.type"/>
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
    import Types from '@/components/Money/Types.vue';
    import FormItem from '@/components/Money/Formltem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator';


    @Component({
        components: {Tags, FormItem, Types, NumberPad},
    })

    export default class Money extends Vue {
        get recordList() {
            return this.$store.state.recordList;
        }

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

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>
