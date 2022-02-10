let daily_manager = (function(){
   let all_participants;

   function fetch_participants(url, callback) {
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.addEventListener("load", render_participants, false);
      request.send();
   }

   function render_participants() {
      if (this.readyState != 4 && this.status >= 400 && !this.responseText.trim()) return;

      all_participants = JSON.parse(this.responseText);
      all_participants.map(create_participant).forEach(add_to_pending_list);
   }

   function create_participant(participant) {
      let participant_div = document.createElement("div");
      participant_div.classList.add("participant");
      participant_div.setAttribute('data-id', participant.id);

      let img;

      if (participant.picture) {
         img = document.createElement("img");
         img.setAttribute('src', participant.picture);
         img.setAttribute('alt', participant.name);
      } else {
         img = document.createElement("div");
         img.setAttribute('class', "default-picture");
         img.setAttribute('alt', participant.name);
         img.innerText = participant.initials;
      }

      let participant_name_tag = document.createElement("span");
      participant_name_tag.classList.add("participant-name");
      participant_name_tag.innerText = participant.name;

      participant_div.appendChild(img);
      participant_div.appendChild(participant_name_tag);

      return participant_div;
   }

   function add_to_pending_list(participant) {
      let to_speak = document.querySelector(".to-speak .participant-list");
      to_speak.appendChild(participant);

      participant.classList.add('popin');
      participant.addEventListener("click", function() {
         change_speaking_participant(participant);
      });
   }

   function change_speaking_participant(new_participant) {
      new_participant.classList.remove("popin");

      let old_participant = document.querySelector(".speaking > .participant");

      if (old_participant) {
         remove_old_participant(old_participant, function() {
            set_new_participant_to_speaking_panel(new_participant);
         });
      } else {
         set_new_participant_to_speaking_panel(new_participant);
      }
   }

   function remove_old_participant(old_participant, callback) {
      old_participant.classList.remove("popin");
      let old_participant_copy = old_participant.cloneNode(true);

      old_participant.addEventListener("animationend", function() {
         old_participant.classList.remove("popout");

         let speaking = document.querySelector(".speaking");
         speaking.removeChild(old_participant);

         let spoken = document.querySelector(".spoken .participant-list");
         spoken.appendChild(old_participant_copy);
         old_participant_copy.classList.add("popin");

         callback();
      });

      old_participant.classList.add("popout");
   }

   function set_new_participant_to_speaking_panel(new_participant) {
      let new_participant_copy = new_participant.cloneNode(true);

      new_participant.addEventListener("animationend", function() {
         let speaking = document.querySelector(".speaking");

         speaking.appendChild(new_participant_copy);
         new_participant_copy.classList.add("popin");

         let to_speak = document.querySelector(".to-speak .participant-list");
         to_speak.removeChild(new_participant)
      });

      new_participant.classList.add("popout");
   }

   function call_random_participant() {
      let all_pending_participants = document.querySelectorAll(".to-speak .participant-list .participant");

      if (all_pending_participants.length === 0) return;

      let random_index = Math.floor(Math.random() * all_pending_participants.length);

      change_speaking_participant(all_pending_participants[random_index]);
   }

   fetch_participants("./data/participants.json", render_participants);

   return {
      call_random_participant
   };
})();
