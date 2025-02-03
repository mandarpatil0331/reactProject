package com.example.grocery_app.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.grocery_app.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}