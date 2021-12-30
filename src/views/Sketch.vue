<template>
    <div class="layout">
        <section class="layers"></section>
        <Container
            class="sketch"
            orientation="vertical"
            @drop="onDrop"
            :drop-placeholder="{
                className: `place-holder`,
                animationDuration: '200',
                showOnTop: true
            }"
        >
            <Draggable v-for="(item, i) in store.componentList" :key="item.id">
                <div class="drag-item">{{ i + 1 }} -> {{ item.data }}</div>
            </Draggable>
        </Container>Î
        <section>
            <ConfigForm />
        </section>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useSketchStore } from '../store/sketch'
import ConfigForm from '@/components/config/ConfigForm.vue'
// import SketchPicture from '../components/sketch/SketchPicture.vue'
// import SketchText from '../components/sketch/SketchText.vue'
// import Vue3DraggableResizable from 'vue3-draggable-resizable'
// import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

import { Container, Draggable } from "vue3-smooth-dnd";

export default defineComponent({
    name: 'Sketch',
    components: {
        // SketchPicture,
        // SketchText,
        // Vue3DraggableResizable,
        ConfigForm,
        Container,
        Draggable
    },
    setup() {
        const store = useSketchStore()
        const active = ref(false)
        const print = console.log
        const handleActiveId = (val: null | number) => {
            if (val !== null) store.$patch({ activeId: val })
        }
        // const onStyleChange = (id: any, style: Record<string, string | number>) => {
        //     console.log(id, style)
        //     const list = store.componentList.map((item) => {
        //         if (item.id === id) {
        //             item.attrs.style = {
        //                 ...item.attrs.style,
        //                 ...style,
        //             }
        //         }
        //         return item
        //     })
        //     store.$patch({ componentList: list })
        // }
        const componentList = computed(() => store.componentList)
        const onDrop = (dropResult: any) => {
            const itemList = applyDrag(componentList.value, dropResult);
            console.log('dropResult', dropResult)
            console.log('itemList', itemList)
            store.$patch({ componentList: itemList })
        }
        const applyDrag = (arr: any[], dragResult: any) => {
            const { removedIndex, addedIndex, payload } = dragResult;
            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null) {
                result.splice(addedIndex, 0, itemToAdd);
            }
            return result;
        }
        return {
            active,
            onDrop,
            store,
            componentList,
        }
    },
})
</script>
<style lang="scss">
.layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.layers {
    width: 200px;
}
.sketch {
    width: 375px;
    height: 1000px;
    position: relative;
    border: 1px solid #e2e2e2;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}
.smooth-dnd-draggable-wrapper {
    line-height: 50px;
    border: 1px solid #e4e4e4;
    user-select: none;
    cursor: pointer;
}
.place-holder {
    width: 100%;
    border: 2px dashed #9d9d03;
    background: rgba(0, 128, 0, 0.164);
}
</style>
