import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CHECKBOX_SIZE, COLORS, shadowStyle } from '../constants/styles';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: () => void;
  onDelete: () => void;
}

/**
 * TaskItem displays an individual task with a tappable checkbox and delete icon.
 */
export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {/* Checkbox circle */}
        <Pressable
          onPress={onToggleComplete}
          style={({ pressed }) => [
            styles.checkboxContainer,
            pressed && styles.checkboxPressed,
          ]}
        >
          <View
            style={[
              styles.checkbox,
              task.completed ? styles.checkedBox : styles.uncheckedBox,
            ]}
          >
            <MaterialCommunityIcons
              name="check"
              size={CHECKBOX_SIZE.icon}
              color={task.completed ? COLORS.white : COLORS.iconLight}
              style={styles.checkIcon}
            />
          </View>
        </Pressable>

        {/* Task text */}
        <Text style={styles.taskText} numberOfLines={2}>
          {task.text}
        </Text>

        {/* Delete icon */}
        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={CHECKBOX_SIZE.icon}
            color={COLORS.iconMedium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    ...shadowStyle,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    borderRadius: CHECKBOX_SIZE.container,
    padding: 4,
    marginRight: 12,
  },
  checkboxPressed: {
    backgroundColor: COLORS.primaryLight,
  },
  checkbox: {
    width: CHECKBOX_SIZE.box,
    height: CHECKBOX_SIZE.box,
    borderRadius: CHECKBOX_SIZE.box / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  uncheckedBox: {
    borderColor: COLORS.primary,
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkIcon: {
    marginTop: -1,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  deleteButton: {
    padding: 6,
    marginLeft: 12,
  },
});