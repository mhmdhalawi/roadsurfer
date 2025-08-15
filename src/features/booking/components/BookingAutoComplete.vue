<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ref, watch, computed } from "vue";
import { refDebounced } from "@vueuse/core";
import { Check, Search } from "lucide-vue-next";
import type { Station } from "@/features/booking/types";
import { fetchStations } from "@/features/booking/services";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from "@/components/ui/combobox";

const search = ref<string>("");
const debouncedSearch = refDebounced(search, 400);

const stations = ref<Station[]>([]);

const isTyping = computed(() => search.value !== debouncedSearch.value);

watch(debouncedSearch, async (newSearchValue) => {
  try {
    stations.value = await fetchStations(newSearchValue);
  } catch (error) {
    console.error("Error fetching stations:", error);
    stations.value = [];
  }
});
</script>

<template>
  <Combobox by="name">
    <ComboboxAnchor class="w-[300px]">
      <div class="relative max-w-sm items-center rounded-md border border-gray-300 bg-white m">
        <ComboboxInput
          v-model="search"
          class="ps-4"
          :display-value="(val) => val?.name ?? ''"
          placeholder="Search for a station..."
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-gray-400" />
        </span>
      </div>
    </ComboboxAnchor>

    <ComboboxList class="w-[300px]">
      <ComboboxEmpty>
        {{ isTyping ? "Loading..." : "No station found." }}
      </ComboboxEmpty>

      <ComboboxGroup v-if="!isTyping">
        <ComboboxItem v-for="station in stations" :key="station.id" :value="station">
          {{ station.name }}

          <ComboboxItemIndicator>
            <Check :class="cn('ms-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
