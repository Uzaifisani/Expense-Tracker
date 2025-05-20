package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import com.expensetracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(User user);
    List<Expense> findByUserOrderByDateDesc(User user);
    void deleteByIdAndUser(Long id, User user);
    List<Expense> findByDateBetweenAndUser(LocalDate startDate, LocalDate endDate, User user);
    List<Expense> findByDateAndUser(LocalDate date, User user);
    List<Expense> findByCategoryAndDateBetweenAndUser(String category, LocalDate startDate, LocalDate endDate, User user);
    List<Expense> findByCategoryAndDateAndUser(String category, LocalDate date, User user);
    Expense findByIdAndUser(Long id, User user);
}