import { defineStore } from 'pinia'
import { componentList } from '../../mock/index'
import { cloneDeep } from 'lodash-es'

interface SketchState {
    activeId: null | number
    pageSchema: any
    componentList: any[]
}
export const useSketchStore = defineStore('app', {
    state: (): SketchState => {
        return {
            activeId: null,
            pageSchema: {},
            componentList: componentList,
        }
    },
    getters: {
        sortedList: (state) => {
            const list = cloneDeep(state.componentList)
            const relativeList = list.filter((item: any)=> {
                return item.attrs.style.position === 'relative'
            })
            relativeList.reduce((acc: number, cur: any) => {
                cur.attrs.style.top = acc
                acc += cur.attrs.style.height
                return acc
            }, 0)
            return relativeList
        },
        current: (state) => {
            return state.componentList.find(item => {
                return item.id === state.activeId
            }) || {}
        }
    },

})
