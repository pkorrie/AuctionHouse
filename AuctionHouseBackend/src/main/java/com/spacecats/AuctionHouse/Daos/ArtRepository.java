package com.spacecats.AuctionHouse.Daos;

import java.util.List;

import com.spacecats.AuctionHouse.Models.Art;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtRepository extends JpaRepository<Art, Integer> {
    List<Art> findArtsByOwnerid(int ownerid); 
}