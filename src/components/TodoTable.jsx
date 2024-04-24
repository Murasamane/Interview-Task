/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Button, Flex, Text, Tooltip } from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";

import useTodo from "../hooks/useTodo";
import { useMutatePatch } from "../hooks/useMutate";
import {
  deleteEntry,
  updateCompleted,
  updateDeadline,
  updateText,
  createEntry,
} from "../services/apiTodos";
import dayjs from "dayjs";

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const { data, isLoading } = useTodo();
  //call CREATE hook

  const { mutate: mutateText, isLoading: isEditingText } =
    useMutatePatch(updateText);

  const { mutate: mutateDeadline, isLoading: isEditingDeadline } =
    useMutatePatch(updateDeadline);

  const { mutate: mutateCompleted, isLoading: isEditingCompleted } =
    useMutatePatch(updateCompleted);

  const { mutate: mutateDelete, isLoading: isDeleting } =
    useMutatePatch(deleteEntry);

  const { mutate: mutateCreateEntry, isLoading: creatingEntry } =
    useMutatePatch(createEntry);

  //CREATE action
  const handleCreateEntry = async ({ values, exitCreatingMode }) => {
    await mutateCreateEntry(values);
    exitCreatingMode();
  };
  const validateRequired = (value) => !!value?.length;

  //DELETE action
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this entry?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.text} ? This action
          cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => mutateDelete(row.original.id),
    });

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "text",
        header: "Text",
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          error: validationErrors?.[cell.id],
          onBlur: (event) => {
            const validationError = !validateRequired(event.currentTarget.value)
              ? "Required"
              : undefined;
            setValidationErrors({
              ...validationErrors,
              [cell.id]: validationError,
            });
            if (!validationError) {
              return;
            }

            mutateText({ id: row.id, text: event.target.value });
          },
        }),
      },
      {
        accessorKey: "deadline",
        header: "Deadline",
        Cell: ({ row }) => dayjs(row.original.deadline).format("YYYY-MM-DD"),
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: "date",
          required: true,
          onBlur: (event) => {
            if (!event.target.value || !row.id) return;
            mutateDeadline({
              id: row.id,
              deadline: dayjs(event.target.value).format("YYYY-MM-DD"), // Pass the Unix timestamp directly
            });
          },
        }),
      },
      {
        accessorKey: "completed",
        header: "Completed",
        Cell: ({ row }) => (row.original.completed ? "Yes" : "No"),
        mantineEditTextInputProps: ({ cell, row }) => ({
          type: "boolean",
          required: true,
          onBlur: (event) => {
            if (!event.target.value || !row.id) return;
            mutateCompleted({
              id: row.id,
              completed: Boolean(event.target.value),
            });
          },
        }),
      },
    ],
    [mutateCompleted, mutateText, mutateDeadline, validationErrors]
  );

  const table = useMantineReactTable({
    columns,
    data: data,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "cell", // ('modal', 'row', 'cell', and 'custom' are also available)
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isLoading
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateEntry,
    renderRowActions: ({ row }) => (
      <Tooltip label="Delete">
        <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
          <IconTrash />
        </ActionIcon>
      </Tooltip>
    ),
    renderBottomToolbarCustomActions: () => (
      <Flex align="center" gap="md">
        {Object.values(validationErrors).some((error) => !!error) && (
          <Text color="red">Fix errors before submitting</Text>
        )}
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Entry
      </Button>
    ),
    state: {
      isLoading: isLoading,
      isSaving:
        creatingEntry ||
        isEditingText ||
        isEditingDeadline ||
        isEditingCompleted ||
        isDeleting,
    },
  });

  return <MantineReactTable table={table} />;
};

const TableProvider = () => (
  <ModalsProvider>
    <Example />
  </ModalsProvider>
);

export default TableProvider;
