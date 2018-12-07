<template>
  <div class="modal" :class="{active, 'modal-sm': small}" id="modal-id">
    <a href="#close" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-container">
      <div class="modal-header">
        <a @click="$emit('close')" class="btn btn-clear float-right" aria-label="Close"></a>
        <div class="modal-title h5">{{ title }}</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <!-- content here -->
          <slot></slot>
        </div>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ConfirmModal extends Vue {
  /**
   * Whether or not this modal is visible.
   */
  @Prop({ default: false })
  private active!: boolean;

  @Prop({ default: "Title" })
  private title!: String;

  /**
   * Whether or not to use small size instead of full size modal.
   */
  @Prop({ default: false })
  private small!: boolean;
}
</script>
