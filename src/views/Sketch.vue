<template>
<div class="layout">
    <section class="layers"></section>
    <main class="sketch">
        <Vue3DraggableResizable
            v-for="cmp in store.sortedList"
            :key="cmp.id"
            :initW="cmp.attrs.style.width"
            :initH="cmp.attrs.style.height"
            :active="store.activeId === cmp.id"
            v-model:y="cmp.attrs.style.top"
            :h="cmp.attrs.style.height"
            :draggable="true"
            :resizable="true"
            :disabled-y="true"
            :parent="true"
            @activated="handleActiveId(cmp.id)"
            @deactivated="handleActiveId(null)"
            @drag-start="print('drag-start')"
            @resize-start="print('resize-start')"
            @dragging="print('dragging')"
            @resizing="print('resizing')"
            @drag-end="print('drag-end')"
            @resize-end="print('resize-end')"
        >
            <component :is="cmp.tag" v-bind="cmp.data" :id="cmp.id" @resize="onStyleChange" />
        </Vue3DraggableResizable>
    </main>
    <section>
        <ConfigForm />
    </section>
    </div>
</template>
<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useSketchStore } from '../store/sketch'
import ConfigForm from '@/components/config/ConfigForm.vue'
import SketchPicture from '../components/sketch/SketchPicture.vue'
import SketchText from '../components/sketch/SketchText.vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default defineComponent({
    name: 'Sketch',
    components: {
        SketchPicture,
        SketchText,
        Vue3DraggableResizable,
        ConfigForm,
    },
    setup() {
        const store = useSketchStore()
        const active = ref(false)
        const print = console.log
        const handleActiveId = (val: null | number) => {
            if (val !== null) store.$patch({ activeId: val })
        }
        const onStyleChange = (id: any, style: Record<string, string | number>) => {
            console.log(id, style)
            const list = store.componentList.map((item) => {
                if (item.id === id) {
                    item.attrs.style = {
                        ...item.attrs.style,
                        ...style,
                    }
                }
                return item
            })
            store.$patch({ componentList: list })
        }
        return {
            active,
            print,
            handleActiveId,
            onStyleChange,
            store,
        }
    },
})
</script>
<style lang="scss">
.layout{
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
</style>
