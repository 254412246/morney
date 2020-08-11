<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Chart :options="x"/>
        <ol v-if="(groupedList.length>0)">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id"
                        class="record"
                    >
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}} </span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            目前没有相关记录
        </div>
    </Layout>
</template>

<style scoped lang="scss">
    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .noResult{
    padding: 16px;
    text-align:center ;
}
    .title {
        @extend %item;
    }

    .record {
        background: white;
        @extend %item;
    }

    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }

    ::v-deep .type-tabs-item {
        background: #C4C4C4;

        &.selected {
            background: white;

            &::after {
                display: none;
            }
        }
    }
    .echarts {
        max-width: 100%;
        height: 400px;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constants/recordTypeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';
    import Chart from '@/components/Chart.vue';
    import 'echarts/lib/chart/line'



    @Component({
        components: {Tabs, Chart},
    })
    export default class Statistics extends Vue {
        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(t=>t.name).join('，');
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get groupedList() {
            const {recordList} = this;


            const newList = clone(recordList)
                .filter(r => r.type === this.type)
                .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            if (newList.length === 0) {return [];}
            type Result = { title: string; total?: number; items: RecordItem[] }[]
            const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(group => {
                group.total = group.items.reduce((sum, item) => {
                    return sum + item.amount;
                }, 0);//初始值是0,结果是sum，每一项是item
            });
            return result;

        }
        get x() {
            return {
                xAxis: {
                    type: 'category',
                    data: [
                        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                        '11', '12', '13', '14', '15'
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [
                        1, 2, 3, 4, 5, 6, 7,
                        8, 9, 10, 11, 12,13,14,15
                    ],
                    type: 'line'
                }],
                tooltip: {show: true}
            };
        }
        beautify(string: string) {
            const day = dayjs(string);
            const now = dayjs();
            if (day.isSame(now, 'day')) {
                return '今天';
            } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
                return '昨天';
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (day.isSame(now, 'year')) {
                return day.format('M月D日');
            } else {
                return day.format('YYYY年M月D日');
            }
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        type = '-';
        recordTypeList = recordTypeList;
    }
</script>

