"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List, DotsSixVertical } from "@phosphor-icons/react";
import { toast } from "sonner";
import { reorderItems } from "@/app/actions/reorder";

// Define Sortable Item Component
function SortableItem({ id, renderItem }: { id: string; renderItem: (dragHandle: React.ReactNode) => React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const dragHandle = (
    <div
      {...attributes}
      {...listeners}
      className="cursor-grab hover:text-gold-600 active:cursor-grabbing p-2"
      title="Drag to reorder"
    >
      <DotsSixVertical size={24} weight="bold" className="text-forest-900/40 hover:text-forest-900" />
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "opacity-50 ring-2 ring-gold-500 rounded-2xl" : ""}
    >
      {renderItem(dragHandle)}
    </div>
  );
}

interface SortableListProps<T extends { id: string }> {
  items: T[];
  model: "Project" | "Service";
  renderItem: (item: T, dragHandle: React.ReactNode) => React.ReactNode;
}

export function SortableList<T extends { id: string }>({
  items: initialItems,
  model,
  renderItem,
}: SortableListProps<T>) {
  const [items, setItems] = useState(initialItems);
  const [isSaving, setIsSaving] = useState(false);

  // Sync with prop if it changes externally
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Save to DB immediately
        saveOrder(newItems);
        return newItems;
      });
    }
  }

  async function saveOrder(newItems: T[]) {
    setIsSaving(true);
    const updates = newItems.map((item, idx) => ({
      id: item.id,
      sortOrder: idx,
    }));

    const result = await reorderItems(updates, model);
    if (!result.success) {
      toast.error(result.error);
    } else {
      toast.success("Urutan berhasil disimpan.");
    }
    setIsSaving(false);
  }

  return (
    <div className="w-full relative">
      {isSaving && (
        <div className="absolute top-2 right-2 text-xs font-medium text-gold-600 z-10">
          Menyimpan...
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <SortableItem 
                key={item.id} 
                id={item.id} 
                renderItem={(dragHandle) => renderItem(item, dragHandle)}
              />
            ))}
            {items.length === 0 && (
              <div className="text-sm text-gray-500 italic p-4 text-center border rounded-lg">
                Belum ada data.
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
