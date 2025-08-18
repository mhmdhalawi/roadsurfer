<script setup lang="ts">
import { cn } from "@/lib/utils";
import { ref, watch, computed } from "vue";
import { refDebounced } from "@vueuse/core";
import { Check, Search, X } from "lucide-vue-next";
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
import { useStationStore } from "@/stores/station";

const store = useStationStore();

const search = ref<string>("");
const debouncedSearch = refDebounced(search, 400);

const stations = ref<Station[]>([]);
const isLoading = ref(false);

const isTyping = computed(() => search.value !== debouncedSearch.value);

watch(debouncedSearch, async (newSearchValue) => {
  isLoading.value = true;
  try {
    stations.value = await fetchStations(newSearchValue);
  } catch (error) {
    console.error("Error fetching stations:", error);
    stations.value = [];
  } finally {
    isLoading.value = false;
  }
});

function clearSearch() {
  search.value = "";
  store.station = null;
}
</script>

<template>
  <Combobox by="name" v-model="store.station">
    <ComboboxAnchor class="w-full lg:w-[300px]">
      <div class="relative max-w-sm items-center rounded-md border border-gray-300 bg-white">
        <ComboboxInput
          v-model="search"
          class="ps-4 pr-8"
          :display-value="() => store.station?.name ?? ''"
          placeholder="Search for a station..."
        />
        <span
          v-if="search || store.station"
          class="absolute end-0 inset-y-0 flex items-center px-3 cursor-pointer"
          @click="clearSearch"
        >
          <X class="size-3 text-gray-400 hover:text-gray-600" />
        </span>
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-gray-400" />
        </span>
      </div>
    </ComboboxAnchor>

    <ComboboxList class="w-[300px]">
      <ComboboxEmpty>
        {{ isTyping || isLoading ? "Loading..." : "No station found." }}
      </ComboboxEmpty>

      <ComboboxGroup>
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
