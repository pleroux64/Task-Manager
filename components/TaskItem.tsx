import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

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
              size={18}
              color={task.completed ? '#fff' : 'rgba(0, 0, 0, 0.2)'}
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
            size={18}
            color="rgba(0, 0, 0, 0.3)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  checkboxContainer: {
    borderRadius: 20,
    padding: 4,
    marginRight: 12,
  },
  checkboxPressed: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  uncheckedBox: {
    borderColor: '#007AFF',
  },
  checkedBox: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkIcon: {
    marginTop: -1,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    lineHeight: 22,
  },
  deleteButton: {
    padding: 6,
    marginLeft: 12,
  },
});